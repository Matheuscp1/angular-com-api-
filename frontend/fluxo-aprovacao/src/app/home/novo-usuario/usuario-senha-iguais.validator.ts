import { FormGroup } from '@angular/forms';

export function usuarioSenhaIguaisValidator(formGroup: FormGroup) {
  const username = formGroup.get('name')?.value ?? '';
  const password = formGroup.get('password')?.value ?? '';

  if (username.trim() + password.trim()) {
    return username !== password ? null : { senhaIgualNome: true };
  } else {
    return null;
  }
}
