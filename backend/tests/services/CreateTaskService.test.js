import test from "node:test";
import assert from "node:assert/strict";
import * as Yup from "yup";

import CreateTaskService from "../../sources/services/CreateTaskService";

test("deve rejeitar uma tarefa com nome vazio", async () => {

    await assert.rejects(

        CreateTaskService.execute({
            task: "",
            userId: 1
        }),

        (error) => error instanceof Yup.ValidationError
    );

});