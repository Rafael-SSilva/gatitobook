import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { first, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioExisteService {
  constructor(private novoUsuarioService: NovoUsuarioService) {}

  usuarioJaExiste(){
    return (control:AbstractControl) :
    | Promise<{ [key: string]: any } | null>
    | Observable<{ [key: string]: any } | null> =>{
      return control.valueChanges.pipe(
        switchMap(
          (nomeUsuario) => this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)
        ),
        map((usuarioExiste) =>
          usuarioExiste?{ usuarioExistente: true }:null
        ),
        first()
        // encerrar fluxo da validação
      );
    };
  }
}
