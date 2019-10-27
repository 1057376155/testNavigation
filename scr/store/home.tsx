import { observable, action, computed } from 'mobx'


class List {
  @observable isShowMap: boolean = false

  @observable test = 123

  @computed get testc() {
    return this.test + 4
  }

  @action
  switchTab(info: boolean) {
    this.isShowMap = info
  }
  @action
  setTest(info) {
    this.test = info
  }

}

export default new List()