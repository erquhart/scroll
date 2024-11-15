import { match } from "ts-pattern";

import type { Stage } from "~src/elm-ts/stage";

export const fromStage = (stage: Stage): string =>
  match(stage)
    .with("Production", () => "pk_live_Y2xlcmsuc2Nyb2xsLmluayQ")
    .with(
      "Development",
      () => "pk_test_Z29vZC1kcmFrZS0zLmNsZXJrLmFjY291bnRzLmRldiQ",
    )
    .exhaustive();
