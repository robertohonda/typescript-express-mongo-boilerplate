import { Application } from "express";
interface IExpress {
  app: Application;
  start: () => void;
}

export default IExpress;
