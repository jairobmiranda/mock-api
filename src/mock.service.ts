import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class MockService {
  constructor(private readonly prisma: PrismaService) {}

  // garante que exista o Resource (por nome) e retorna-o
  async ensureResource(name: string) {
    const resource = await this.prisma.resource.findUnique({ where: { name } });
    if (resource) return resource;
    return this.prisma.resource.create({ data: { name } });
  }

  // cria um MockEntry ligado ao resource
  async createEntry(
    resourceName: string,
    params: {
      method: string;
      path?: string | null;
      headers?: any;
      body?: any;
      statusCode?: number;
    },
  ) {
    const resource = await this.ensureResource(resourceName);
    const {
      method,
      path = null,
      headers = null,
      body = null,
      statusCode,
    } = params;
    const effectiveStatus = statusCode ?? (method === 'POST' ? 201 : 200);

    const entry = await this.prisma.mockEntry.create({
      data: {
        resourceId: resource.id,
        method,
        path,
        headers,
        body,
        statusCode: effectiveStatus,
      },
    });

    return entry;
  }

  // retorna todos os entries do resource (resume)
  async findAll(resourceName: string) {
    const resource = await this.prisma.resource.findUnique({
      where: { name: resourceName },
      include: { entries: true },
    });
    return resource?.entries ?? [];
  }

  // encontra por id (MockEntry.id)
  async findOneById(id: string) {
    return this.prisma.mockEntry.findUnique({ where: { id } });
  }

  // atualiza por id
  async updateById(
    id: string,
    data: { body?: any; headers?: any; statusCode?: number },
  ) {
    try {
      return await this.prisma.mockEntry.update({
        where: { id },
        data: {
          body: data.body ?? undefined,
          headers: data.headers ?? undefined,
          statusCode: data.statusCode ?? undefined,
        },
      });
    } catch (e) {
      return null;
    }
  }

  // remove por id
  async removeById(id: string) {
    try {
      return await this.prisma.mockEntry.delete({ where: { id } });
    } catch (e) {
      return null;
    }
  }
}
