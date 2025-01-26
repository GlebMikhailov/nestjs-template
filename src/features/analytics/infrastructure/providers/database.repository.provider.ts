import { VictoriaRepository } from '@analytics/infrastructure/adapters/persistence/victoria-repository.repository';

export const ANALYTICS_VIKTORIA_REPOSITORY_TOKEN = 'ANALYTICS_VIKTORIA_REPOSITORY_TOKEN';

export const ViktoriaRepositoryProvider = {
    provide: ANALYTICS_VIKTORIA_REPOSITORY_TOKEN,
    useFactory: () => {
        return new VictoriaRepository();
    },
};
