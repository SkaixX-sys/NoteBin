import AWS from "aws-sdk";
import config from "./aws-config.js";

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
  endpoint: config.endpoint,
});

const s3 = new AWS.S3();

export default s3;
