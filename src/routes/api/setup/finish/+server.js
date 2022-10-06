import cookie from "cookie";

import * as api from "$lib/api.util.server";
import generateToken from "$lib/csrf.js";
import {
  COOKIE_PREFIX,
  CSRF_TOKEN_COOKIE_NAME,
  JWT_COOKIE_NAME,
} from "$lib/variables.js";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  const body = await request.json();

  const response = await api.POST("/setup/finish", JSON.stringify(body));

  const headers = new Headers();

  if (response.result === "ok") {
    const CSRFToken = generateToken();

    headers.append(
      "set-cookie",
      cookie.serialize(COOKIE_PREFIX + JWT_COOKIE_NAME, response.jwt, {
        httpOnly: true,
        path: "/",
      })
    );

    headers.append(
      "set-cookie",
      cookie.serialize(COOKIE_PREFIX + CSRF_TOKEN_COOKIE_NAME, CSRFToken, {
        httpOnly: true,
        path: "/",
      })
    );
  }

  return new Response(JSON.stringify(response), { headers });
}
