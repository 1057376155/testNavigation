import { observable, action, runInAction } from 'mobx'

class List {
  @observable listData: Array<any> = []

  @action
  getListData () {
    fetch('https://ik9hkddr.qcloud.la/mock/cookbook-list.json')
      .then(reponse => reponse.json())
      .then(result => {
        runInAction(() => {
          this.listData = result.data
        })
      })
  }
}

export default new List()