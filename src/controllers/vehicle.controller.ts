import { Request, Response } from "express";
import { handleError } from "../util/handle-error";
import fetch from "node-fetch";

export class VehicleController {
  private etisToken = "4a8ab0635a98a26bda3e975585a0776d";

  constructor() {}

  async trackerInfo(req: Request, res: Response) {
    const { vin, order } = req.query;

    if (!vin) return handleError(res, "No VIN was provided in query.");
    if (!order)
      return handleError(res, "No order number was provided in query.");

    fetch(
      `https://shop.ford.com/aemservices/shop/vot/api/customerorder/?orderNumber=${order}&partAttributes=BP2_.*&vin=${vin}`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "sec-ch-ua":
            '" Not;A Brand";v="99", "Microsoft Edge";v="91", "Chromium";v="91"',
          "sec-ch-ua-mobile": "?0",
          "x-dtpc": "11$137594181_925h15vQOKCKKPCLDIGRRUJGVFAMMWSPLHGKECT-0e4",
        },
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => res[0])
      .then((data) => res.json({ data }))
      .catch((error) => handleError(res, error, 500));
  }

  async etisInfo(req: Request, res: Response) {
    const { vin } = req.query;
    if (!vin) return handleError(res, "No VIN was provided in query.");

    const form: any = {
      "org.apache.struts.taglib.html.TOKEN": this.etisToken,
      vin,
    };

    var formBody = [];
    for (var property in form) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(form[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    return fetch(
      `https://www-etisorigin.app.ford.com/vehicle/pti/systemsAndEcu.do?org.apache.struts.taglib.html.TOKEN=${this.etisToken}`,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        method: "POST",
        body: formBody.join("&"),
      }
    )
      .then((res) => res.json())
      .then((data) => res.json({ data }))
      .catch((error) => handleError(res, error, 500));
  }
}
