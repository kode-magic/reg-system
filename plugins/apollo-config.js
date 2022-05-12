import Cookie from "js-cookie";

export default function (ctx) {
    const token = Cookie.get("staff_access_token");

    return {
        // httpEndpoint: "https://fbc-student-api-kble4lljhq-uc.a.run.app/api",
        httpEndpoint: "http://localhost:5500/api",
        getAuth: () => token
    }
}
