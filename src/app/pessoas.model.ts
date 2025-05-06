export class Pessoa {
  constructor(
    public nome: string,
    public telefone: string,
    public idade: number | null,
    public genero: string,
    public id?: number
  ) {}
}
