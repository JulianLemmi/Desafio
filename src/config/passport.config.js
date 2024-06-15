import passport from "passport";  // Importa el módulo passport para la autenticación
import local from "passport-local";  // Importa el módulo passport-local para autenticación local
import google from "passport-google-oauth20";  // Importa el módulo passport-google-oauth20 para autenticación con Google
import { createHash, isValidPassword } from "../utils/hashPassword.js";  // Importa funciones para crear y validar hashes de contraseñas
import userDao from "../dao/mongoDao/user.dao.js";  // Importa el DAO para operaciones con usuarios en MongoDB

const LocalStrategy = local.Strategy;  // Define la estrategia local
const GoogleStrategy = google.Strategy;  // Define la estrategia de Google

const initializePassport = () => {
  // Configura la estrategia de registro
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },  // Configura la estrategia para usar el email como nombre de usuario
      async (req, username, password, done) => {  // Función de verificación
        try {
          const { first_name, last_name, email, age } = req.body;  // Extrae los datos del cuerpo de la solicitud
          const user = await userDao.getByEmail(username);  // Busca si el usuario ya existe
          if (user) return done(null, false, { message: "El usuario ya existe" });  // Si el usuario ya existe, retorna un error

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),  // Crea un hash de la contraseña
          };

          const createUser = await userDao.create(newUser);  // Crea el nuevo usuario
          return done(null, createUser);  // Retorna el usuario creado
        } catch (error) {
          return done(error);  // Retorna cualquier error
        }
      }
    )
  );

  // Configura la estrategia de inicio de sesión
  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
      try {
        const user = await userDao.getByEmail(username);  // Busca el usuario por email
        if (!user || !isValidPassword(user, password)) return done(null, false, { message: "email o password inválidos" });  // Verifica la contraseña

        return done(null, user);  // Si las credenciales son correctas, retorna el usuario
      } catch (error) {
        done(error);  // Retorna cualquier error
      }
    })
  );

  // Configura la estrategia de Google
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: "",  // ID del cliente de Google
        clientSecret: "",  // Secreto del cliente de Google
        callbackURL: "http://localhost:8080/api/session/google",  // URL de retorno después de la autenticación
      },
      async (accessToken, refreshToken, profile, cb) => {  // Función de verificación
        try {
          const { name, emails } = profile;

          const user = {
            first_name: name.givenName,
            last_name: name.familyName,
            email: emails[0].value,
          };

          const existUser = await userDao.getByEmail(emails[0].value);  // Busca si el usuario ya existe
          if (existUser) return cb(null, existUser);  // Si el usuario ya existe, retorna el usuario

          const newUser = await userDao.create(user);  // Crea el nuevo usuario
          cb(null, newUser);  // Retorna el usuario creado
        } catch (error) {
          return cb(error);  // Retorna cualquier error
        }
      }
    )
  );

  // Serializa el usuario para almacenar el ID en la sesión
  passport.serializeUser((user, done) => {
    done(null, user._id);  // Almacena el ID del usuario en la sesión
  });

  // Deserializa el usuario para recuperar los datos del usuario usando el ID de la sesión
  passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);  // Busca el usuario por ID
    done(null, user);  // Retorna el usuario
  });
};

export default initializePassport;  // Exporta la función para inicializar passport
