import { Component } from '@angular/core';
import { PessoaComponent } from './pessoa.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PessoaComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'aula01-view';
}
