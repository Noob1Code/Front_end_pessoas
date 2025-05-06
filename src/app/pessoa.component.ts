import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Pessoa } from './pessoas.model';
import { PessoaService } from './pessoa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  nome = '';
  telefone = '';
  idade: number | null = null;
  genero = '';
  idEditando: number | null = null;

  pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.listar();
  }

  salvar() {
    const pessoa = new Pessoa(this.nome, this.telefone, this.idade, this.genero);

    if (this.idEditando !== null) {
      this.pessoaService.atualizarPessoa(this.idEditando, pessoa).subscribe(() => {
        alert('Pessoa atualizada com sucesso!');
        this.limparCampos();
        this.listar();
      });
    } else {
      this.pessoaService.adicionarPessoa(pessoa).subscribe(() => {
        alert('Pessoa salva com sucesso!');
        this.limparCampos();
        this.listar();
      });
    }
  }

  listar() {
    this.pessoaService.getPessoas().subscribe((data) => {
      this.pessoas = data;
    });
  }

  editar(pessoa: Pessoa, id: number | undefined) {
    if (id === undefined) return;
    this.nome = pessoa.nome;
    this.telefone = pessoa.telefone;
    this.idade = pessoa.idade;
    this.genero = pessoa.genero;
    this.idEditando = id; 
  }
  
  excluir(id: number | undefined) {
    if (id === undefined) return;
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.excluirPessoa(id).subscribe(() => {
        alert('Pessoa excluída com sucesso!');
        this.listar();
      });
    }
  }
  

  limparCampos() {
    this.nome = '';
    this.telefone = '';
    this.idade = null;
    this.genero = '';
    this.idEditando = null;
  }

  permitirSomenteNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
