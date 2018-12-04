export class MailerServiceMock {
  sendMail(): Promise<any> {
    return Promise.resolve(true);
  }
}