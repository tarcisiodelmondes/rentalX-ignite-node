import aws from "aws-sdk";
import handlebars from "handlebars";
import fs from "node:fs";
import nodemailer, { SentMessageInfo } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { injectable } from "tsyringe";

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: process.env.AWS_REGION,
});

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Mail<SentMessageInfo>;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: ses,
    });
  }

  async sendMail(to: string, subject: string, variables: any, path: string) {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: "Rentx <developer@tarcisiodelmondes.dev>",
      subject,
      html: templateHTML,
    });
  }
}
