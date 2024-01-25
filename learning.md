## JwtStrategy

El método [`validate`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) de [`JwtStrategy`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) se utiliza automáticamente por Passport.js cuando se intenta autenticar una ruta utilizando el [`JwtAuthGuard`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).

Cuando se hace una solicitud a una ruta protegida con [`JwtAuthGuard`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html), Passport.js extrae el token JWT de la cabecera de autorización de la solicitud, lo decodifica y pasa el payload decodificado al método [`validate`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).

Aquí está el flujo de cómo funciona:

1.  El cliente envía una solicitud a una ruta protegida con un token JWT en la cabecera de autorización.
2.  [`JwtAuthGuard`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) intercepta la solicitud y utiliza [`JwtStrategy`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) para validar el token.
3.  [`JwtStrategy`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) extrae el token JWT de la cabecera de autorización utilizando `ExtractJwt.fromAuthHeaderAsBearerToken()`.
4.  [`JwtStrategy`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) decodifica el token utilizando la clave secreta proporcionada en su constructor.
5.  El payload decodificado del token se pasa al método [`validate`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
6.  El método [`validate`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) recibe el payload y puede realizar cualquier lógica adicional necesaria para validar el usuario (por ejemplo, comprobar si el usuario existe en la base de datos).
7.  Si el método [`validate`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) devuelve un objeto, Passport.js considera que la autenticación es exitosa y adjunta el objeto devuelto a la propiedad [`user`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) del objeto `Request`.
8.  Si el método [`validate`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) lanza una excepción, Passport.js considera que la autenticación ha fallado y la solicitud es denegada.

En tu caso, el método [`validate`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) en [`JwtStrategy`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) simplemente devuelve el payload que recibe:

```javascript
async validate(payload: any) {

 return { user: payload.user, sub: payload.sub };

}
```

Esto significa que el payload del token JWT se adjuntará a la propiedad [`user`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) del objeto `Request` y estará disponible en tus controladores.

Paste some Markdown-formatted content and see the output below.
