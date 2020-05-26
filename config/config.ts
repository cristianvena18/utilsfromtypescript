import {env} from "./environment";
import {ConfigValueNotValid} from "./Exceptions/ConfigValueNotValid";

const configValues = {
    jwt: {
        secret: "adagadada",
        expirationTime: "1h"
    },
    database: {
        credentials: {
            username: env("DATABASE_USER", "root"),
            password: env("DATABASE_PASSWORD", "secret"),
        },
        host: env("DATABASE_HOST","mysql"),
    },
    redis: {
        username: env('REDIS_USER'),
        host: env('REDIS_HOST', "localhost"),
    },
}


/**
 *
 * @param route
 * @param defaultValue
 */
export const config = (route: string, defaultValue: string = null): string => {
    let finalValue = defaultValue;
    if(route.includes('.'))
    {
        const values = route.split('.');
        values.forEach((value, key) => {
            if(key == 0)
            {
                finalValue = configValues[value];
            }
            else{
                finalValue = finalValue[value];
            }
        });
    }else {
        finalValue = configValues[route];
    }

    if(typeof finalValue !== "string")
    {
        throw new ConfigValueNotValid();
    }
    else{
        return finalValue ? finalValue : defaultValue;
    }
}