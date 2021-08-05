import { environment } from "./config/constants";

import { app } from "./app";

app.listen(environment.PORT, () => {
  console.log(`Server running on port ${environment.PORT}.`);
});
