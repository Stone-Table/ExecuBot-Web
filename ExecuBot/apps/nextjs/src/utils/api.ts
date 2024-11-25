import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@Saasfly/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@Saasfly/api";
