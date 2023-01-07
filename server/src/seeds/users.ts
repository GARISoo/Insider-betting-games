import { UserModel } from "../models/user.js"
import bcrypt from 'bcrypt'
import { User } from "../types.js"

const salt = await bcrypt.genSalt(10)

const hashPassword = async (password: string) => bcrypt.hash(password, await salt)

const defaultUsers = [
    {
        username: 'admin',
        name: 'Aldis',
        surname: 'Miervaldis',
        password: await hashPassword('admin'),
        roles: { User: 1000, Admin: 2000 },
        hasPaid: true,
    },
]

const users = async () => {
    const users = await UserModel.find({ deleted: false })

    if (!users.length) {
        await UserModel.insertMany(defaultUsers)
        return
    }

    if (!defaultUsers.length) {
        return
    }

    const usersToAdd: User[] = defaultUsers.filter((defaultUser) => (
        !users.find(({ username }) => username === defaultUser.username))
    );

    const usersToRemove = users.filter((user) => (
        !defaultUsers.find(({ username }) => username === user.username))
    );

    [...usersToAdd, ...usersToRemove].forEach((user) => {
        if (usersToAdd.includes(user)) {
            UserModel.insertMany(user);
        } else {
            UserModel.updateMany({ username: user.username }, { deleted: true });
        }
    });

}

export default users