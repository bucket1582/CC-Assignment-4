export const handler = async (event, context) => {
    const { x: qs_x, y: qs_y } = event.queryStringParameters || {};
    const x = Number(qs_x);
    const y = Number(qs_y);
    if (isNaN(x)) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                "type": "error",
                "message": "x should be a number"
            })
        };
    } 
    
    if (isNaN(y)) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                "type": "error",
                "message": "y should be a number"
            })
        };
    }

    return {
        "type": "success",
        "sum": x + y,
        "prod": x * y
    };
}
