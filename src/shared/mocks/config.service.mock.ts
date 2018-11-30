export class ConfigServiceMock {
  get(param: string | string[], value?: any): any {
    return 'environment.value';
  }
}