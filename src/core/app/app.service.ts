import { INestApplication, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    private appInstance: INestApplication<any>;

    setAppInstance(app: INestApplication<any>) {
        this.appInstance = app;
    }

    getAppInstance(): INestApplication<any> {
        return this.appInstance;
    }
}
