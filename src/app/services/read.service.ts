import { Observable, throwError, of, Subject, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca } from './../models/marca.model';
import { Ano } from './../models/ano.model';
import { Modelo } from './../models/modelo.model';
import { Carro } from './../models/carro.model';


@Injectable({
  providedIn: "root",
})
export class ReadService {

  public marcaId = new BehaviorSubject<number>(0);
  public modeloId = new BehaviorSubject<number>(0);
  public anoId = new BehaviorSubject<number>(0);

  public modeloCarregado = false;
  public anoCarregado = false;
  public carroCarregado = false;

  constructor(
    private http: HttpClient
  ){}

  getMarcas(): Observable<Marca[]> {
    this.modeloCarregado = false;
    this.anoCarregado = false;
    this.carroCarregado = false;
    return this.http.get<any[]>('https://parallelum.com.br/fipe/api/v1/carros/marcas')
    .pipe(
      map(p => p.map(marca => new Marca(marca['codigo'], marca['nome']))),
      catchError((e) => {
        console.log(e);
        return throwError
      })
    );
  }

  getModelos(): Observable<Modelo[]> {
    this.modeloCarregado = false;
    this.anoCarregado = false;
    this.carroCarregado = false;

    if(this.marcaId.value == 0){
      return of([]);
    }

    return this.http.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${this.modeloId.value}/modelos`)
    .pipe(
      map(p => p['modelos'].map(modelo => new Modelo(modelo['codigo'], modelo['nome']))),
      tap(p => {
        this.modeloCarregado = true;
      }),
      catchError((e) => {
        console.log(e);
        return throwError
      })
    );
  }

  getAnos(): Observable<Ano[]>{
    this.anoCarregado = false;
    this.carroCarregado = false;

    if(this.modeloId.value == 0){
      return of([]);
    }

    return this.http.get<any[]>(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${this.marcaId.value}/modelos/${this.modeloId.value}/anos`)
    .pipe(
      map(p => p.map(modelo => new Modelo(modelo['codigo'], modelo['nome']))),
      tap(p => this.anoCarregado = true),
      catchError((e) => {
        console.log(e);
        return throwError
      })
    );

  }

  getCarro(): Observable<Carro> {
    this.carroCarregado = false;

    if(this.anoId.value == 0){
      return of (null);
    }

    this.http.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${this.marcaId.value}/modelos/${this.modeloId.value}/anos/${this.anoId.value}`).pipe(
      map(res=>{
        console.log(res);
        return;
      })
    )

  }

}
