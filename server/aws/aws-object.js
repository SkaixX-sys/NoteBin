import s3 from "./aws-interactions.js";

class VKCloud {
  async createObject(objectKey, objectBody) {
    const bucketName = "posts-data";

    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Body: objectBody,
    };

    return s3.upload(params, function (err, data) {
      if (err) {
        console.log("Ошибка загрузки:", err);
        return false;
      } else {
        console.log("Файл успешно загружен:", data.Location);
        return true;
      }
    });
  }
  async fetchObject(objectKey) {
    const bucketName = "posts-data";

    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };

    try {
      const data = await s3.getObject(params).promise();
      return data.Body.toString();
    } catch (err) {
      console.log(
        "Ошибка получения данных из VK Cloud, вместо этих данных используются данные из бд"
      );
    }
  }
}
export default new VKCloud();
