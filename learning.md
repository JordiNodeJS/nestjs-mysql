## JwtStrategy

El método [`validate`]() de [`JwtStrategy`]() se utiliza automáticamente por Passport.js cuando se intenta autenticar una ruta utilizando el [`JwtAuthGuard`]().

Cuando se hace una solicitud a una ruta protegida con [`JwtAuthGuard`](), Passport.js extrae el token JWT de la cabecera de autorización de la solicitud, lo decodifica y pasa el payload decodificado al método [`validate`]().

Aquí está el flujo de cómo funciona:

1.  El cliente envía una solicitud a una ruta protegida con un token JWT en la cabecera de autorización.
2.  [`JwtAuthGuard`]() intercepta la solicitud y utiliza [`JwtStrategy`]() para validar el token.
3.  [`JwtStrategy`]() extrae el token JWT de la cabecera de autorización utilizando `ExtractJwt.fromAuthHeaderAsBearerToken()`.
4.  [`JwtStrategy`]() decodifica el token utilizando la clave secreta proporcionada en su constructor.
5.  El payload decodificado del token se pasa al método [`validate`]().
6.  El método [`validate`]() recibe el payload y puede realizar cualquier lógica adicional necesaria para validar el usuario (por ejemplo, comprobar si el usuario existe en la base de datos).
7.  Si el método [`validate`]() devuelve un objeto, Passport.js considera que la autenticación es exitosa y adjunta el objeto devuelto a la propiedad [`user`]() del objeto `Request`.
8.  Si el método [`validate`]() lanza una excepción, Passport.js considera que la autenticación ha fallado y la solicitud es denegada.

En tu caso, el método [`validate`]() en [`JwtStrategy`]() simplemente devuelve el payload que recibe:

```javascript
async validate(payload: any) {

 return { user: payload.user, sub: payload.sub };

}
```

Esto significa que el payload del token JWT se adjuntará a la propiedad [`user`]() del objeto `Request` y estará disponible en tus controladores.

# LocalAuthGuard

_auth.controller.ts_

```typescript
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }
```

En tu código, estás utilizando la estrategia `LocalAuthGuard` para la ruta `login`. Esta estrategia de Passport.js se encarga de validar las credenciales del usuario (normalmente un nombre de usuario y una contraseña) y, si las credenciales son válidas, adjunta el objeto de usuario al objeto de solicitud.

Aquí está el flujo de cómo funciona:

1.  El cliente envía una solicitud a la ruta `login` con las credenciales del usuario en el cuerpo de la solicitud.
2.  `LocalAuthGuard` intercepta la solicitud y extrae las credenciales del cuerpo de la solicitud.
3.  `LocalAuthGuard` pasa las credenciales al método `validate` de la estrategia `LocalStrategy`.
4.  `LocalStrategy` valida las credenciales. Si las credenciales son válidas, `LocalStrategy` busca el objeto de usuario correspondiente y lo devuelve desde el método `validate`.
5.  `LocalAuthGuard` toma el objeto de usuario devuelto por `LocalStrategy` y lo adjunta al objeto de solicitud.
6.  Cuando el controlador maneja la solicitud, puede acceder al objeto de usuario a través de `req.user`.

Por lo tanto, cuando tu método `login` se ejecuta, puedes estar seguro de que `req.user` contiene el objeto de usuario, siempre que las credenciales proporcionadas en la solicitud sean válidas. Si las credenciales no son válidas, Passport.js enviará una respuesta con un código de estado 401 y tu método `login` no se ejecutará.
