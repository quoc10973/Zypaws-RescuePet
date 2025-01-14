import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: unknown, executionContext: ExecutionContext) => {
        const request = executionContext.switchToHttp().getRequest();
        return request.current; // 'current' is the key that we set in the middleware to store the user object
    }
);