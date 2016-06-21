function initSystemJS( entryPoint, baseURL )
{
    if ( entryPoint === void 0 )
        entryPoint = "main"

    if ( baseURL === void 0 )
        baseURL = "/js"

    System.config({
        baseURL : baseURL,
        defaultJSExtensions : true
    });

    System.import(entryPoint)
        .then(null, console.error.bind(console));
}