import { getCustomRepository } from 'typeorm';
import { compareSync, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import nodemailer from 'nodemailer';
import UsersRepository from '../repositories/UsersRepository';

const SMTP_CONFIG = require('./senha');

interface IUserRequest {
  id?: number;
  profileId?: number;
  name?: string;
  email?: string;
  password?: string;
  departmentId?: number;
  occupation?: string;
  timeExperience?: number;
  active?: boolean;
  createdBy?: number;
  newPassword?: string;
  code?: string;
}

class UserService {
  // cria um novo user
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create({
    profileId,
    name,
    email,
    password,
    departmentId,
    occupation,
    timeExperience,
    active,
    createdBy,
  }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error('Email ja cadastrado');
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const passwordHash = await hash(password!, 8);

    const user = usersRepository.create({
      profileId,
      name,
      email,
      password: passwordHash,
      departmentId,
      occupation,
      timeExperience,
      active,
      createdBy,
    });

    await usersRepository.save(user);

    return user;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async searchUser({ email }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      email,
    });

    return user;
  }

  // atualiza user
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async update({
    id,
    profileId,
    name,
    email,
    departmentId,
    occupation,
    timeExperience,
    active,
    createdBy,
  }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      id,
    });

    if (!user) {
      throw new Error('User nao existe');
    }

    const newUser = usersRepository.create({
      id,
      profileId,
      name,
      email,
      departmentId,
      occupation,
      timeExperience,
      active,
      createdBy,
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await usersRepository.update(newUser.id, newUser);

    return newUser;
  }

  // deleta user
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async delete({ id }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const idUser = await usersRepository.findOne({
      id,
    });

    if (!idUser) {
      throw new Error('User nao existe');
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await usersRepository.delete(id!);

    return usersRepository.find();
  }

  // autenticação de login do user
  async authentication({ email, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.find({
      email,
    });

    if (!user) {
      throw new Error('User nao existe');
    }
    if (!compareSync(password!, user[0].password)) {
      throw new Error('email ou senha errados');
    }

    const token = sign(
      { email: user[0].email },
      'aa6119b1f7da242bee0036a2660120e3',
      { subject: user[0].id.toString(), expiresIn: '1d' },
    );

    return token;
  }

  // mudar senha de user
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async changePassword({ id, newPassword }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.find({
      id,
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newPasswordHash = await hash(newPassword!, 8);

    if (compareSync(newPassword!, user[0].password)) {
      throw new Error('Digite uma senha diferente');
    }

    const newUserPassword = usersRepository.create({
      password: newPasswordHash,
    });

    await usersRepository.update(id!, newUserPassword);

    return usersRepository.findOne({
      id,
    });
  }

  // recuperação de senha
  async forgottenPassword({ email }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new Error('Email invalido');
    }
    // passando aqui de boa

    const code = uuid();
    const date = new Date();

    await usersRepository.update(user.id, { forgottenPasswordCode: code });
    await usersRepository.update(user.id, { forgottenPasswordTime: date });

    const transport = nodemailer.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: false,
      auth: {
        user: SMTP_CONFIG.user, // user
        pass: SMTP_CONFIG.pass, // password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // passo aqui tambem

    console.log(transport);
    const info = await transport.sendMail({
      from: '"Fred Foo 👻" <thiagonunes026@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: `<b>Hello world?</b> <br> <a href="http://localhost:3000/#/auth/change-password">Clique aqui para alterar sua senha</a>`, // html body
    });
    return info;
  }

  async forgottenPasswordSecondStage({ code, newPassword }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      forgottenPasswordCode: code,
    });

    if (!user) {
      throw new Error('Codigo nao existe');
    }

    const newPasswordHash = await hash(newPassword!, 8);

    await usersRepository.update(user.id, { password: newPasswordHash });

    return usersRepository.findOne({
      forgottenPasswordCode: code,
    });
  }
}

export default UserService;
