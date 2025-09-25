import { Controller, All, Req, Res, Body, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import { MockService } from './mock.service';

/**
 * Catch-all controller: pega req.path e req.method.
 * - primeira segmento: resource (ex: /usuarios/ -> resource = 'usuarios')
 * - resto do path (primeiro segmento após resource) é tratado como id, se presente
 *
 * Exemplos:
 * POST /produtos        -> cria nova entrada para resource 'produtos' (status 201)
 * GET  /produtos        -> retorna todas as entries para 'produtos'
 * GET  /produtos/:id    -> retorna entry por id
 * PUT  /produtos/:id    -> atualiza entry (body)
 * DELETE /produtos/:id  -> deleta entry por id
 */
@Controller()
export class MockController {
  constructor(private readonly mock: MockService) {}

  @All('*')
  async handle(@Req() req: Request, @Res() res: Response, @Body() body: any) {
    const rawPath = req.path; // ex: "/usuarios/123"
    const segments = rawPath.split('/').filter(Boolean); // remove vazios
    const resource = segments[0] ?? 'root';
    const maybeId = segments[1] ?? null; // se existir, usamos como id

    const method = req.method.toUpperCase();

    // gravar sempre a requisição recebida (útil para auditoria)
    // OBS: para GET/DELETE você pode querer apenas registrar ou não; aqui registramos sempre.
    if (method === 'POST') {
      const created = await this.mock.createEntry(resource, {
        method,
        path: maybeId ? `/${segments.slice(1).join('/')}` : null,
        headers: req.headers,
        body,
        statusCode: 201,
      });
      return res.status(201).json(created);
    }

    if (method === 'GET') {
      if (maybeId) {
        const entry = await this.mock.findOneById(maybeId);
        if (!entry) return res.status(404).json({ error: 'Not found' });
        return res.status(entry.statusCode ?? 200).json({
          id: entry.id,
          method: entry.method,
          body: entry.body,
          headers: entry.headers,
          createdAt: entry.createdAt,
        });
      } else {
        const entries = await this.mock.findAll(resource);
        // retornar resumo das entradas
        const payload = entries.map((e) => ({
          id: e.id,
          method: e.method,
          statusCode: e.statusCode,
          path: e.path,
          createdAt: e.createdAt,
          body: e.body,
        }));
        return res.status(200).json(payload);
      }
    }

    if (method === 'PUT' || method === 'PATCH') {
      if (!maybeId)
        return res.status(400).json({ error: 'ID required in path' });
      const updated = await this.mock.updateById(maybeId, {
        body,
        headers: req.headers,
        // se quiser controlar status via um campo do body, pode pegar body.__statusCode
      });
      if (!updated) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(updated);
    }

    if (method === 'DELETE') {
      if (!maybeId)
        return res.status(400).json({ error: 'ID required in path' });
      const removed = await this.mock.removeById(maybeId);
      if (!removed) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json({ ok: true, removed });
    }

    // métodos não suportados
    return res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json({ error: 'Method not allowed' });
  }
}
