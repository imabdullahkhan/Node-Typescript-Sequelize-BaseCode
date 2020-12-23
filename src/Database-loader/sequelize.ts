import { Sequelize } from 'sequelize-typescript';
import UserModel from '../features/user/userModel';

const sequelize = new Sequelize('basecode', 'root', '', {
        repositoryMode: true,
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        models : [UserModel]
});
(async () => {
        try {
                await sequelize.authenticate();
                console.log('Connection has been established successfully.');
        } catch (error) {
                console.error('Unable to connect to the database:', error);
        }
})();
console.log(`${__dirname}/../../../src/feautures/user/UserModel.ts` , "dire")
// sequelize.addModels([`${__dirname}/../../../src/feautures/User/UserModel.ts`]);
// sequelize.addModels([UserModel]);
sequelize.sync();

export default sequelize;