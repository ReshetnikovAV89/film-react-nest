require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/deploy-pm2',
} = process.env;

module.exports = {
  apps: [
    {
      name: 'film-api',
      script: './dist/main.js',
      cwd: DEPLOY_PATH ? `${DEPLOY_PATH}/current/backend` : process.cwd(),
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT,
        DATABASE_DRIVER: process.env.DATABASE_DRIVER,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PORT: process.env.DATABASE_PORT,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        FILMS_LIMIT: process.env.FILMS_LIMIT,
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/ReshetnikovAV89/film-react-nest.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/shared/.env`,
      'post-deploy': '. /home/andre/.nvm/nvm.sh && cd /home/andre/film-react-nest/current && cp ../shared/.env ./backend/.env && cd backend && npm ci && npm run build && (pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production) && pm2 save',
    },
  },
};
