import 'dotenv/config';

export class Helper {
  public static URL: string = process.env.URL;
  public static DBNAME: string = process.env.DBNAME;
  public static USER: string = process.env.USER;
  public static PASS: string = process.env.PASS;
}
