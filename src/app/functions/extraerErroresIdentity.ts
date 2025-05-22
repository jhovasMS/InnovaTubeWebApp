export function extraerErroresIdentity(obj:any): string[] {
    let mensajeDeError: string[] = [];
    for(let i = 0; i < obj.error.length; i++){
      const elemento = obj.error[i];
      mensajeDeError.push(elemento.description);
    }
    return mensajeDeError;
}