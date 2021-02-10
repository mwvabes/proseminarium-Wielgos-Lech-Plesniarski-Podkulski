import { AbstractControl } from '@angular/forms';

export function ValidateNip(
  control: AbstractControl
): { [key: string]: any } | null {
  if (!control.value) {
    return { invalidNip: control.value };
  }
  if (control.value.length !== 10) {
    return { invalidNip: control.value };
  }
  const number = control.value.split('').map(Number);
  const checksum =
    (6 * number[0] +
      5 * number[1] +
      7 * number[2] +
      2 * number[3] +
      3 * number[4] +
      4 * number[5] +
      5 * number[6] +
      6 * number[7] +
      7 * number[8]) %
    11;
  return number[9] === checksum ? null : { invalidNip: control.value };
}
