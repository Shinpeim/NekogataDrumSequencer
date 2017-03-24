import ServiceLocator from '../../usecase/UsecaseServiceLocator'

export default {
    beforeCreate(){
        this.usecase = ServiceLocator.resolve("SequencerUsecase");
        this.subscriptions = [];
    },

    beforeDestroy(){
        for (const s of this.subscriptions) {
            s.unsbscribe();
        }
    }
}
