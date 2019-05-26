import ElectionActivityAPI from '../activity/index'

const API = {
  async vote(user, activityId, candidateListSelected) {
    let activity = await ElectionActivityAPI.findById(activityId)
    const { candidateList, startTime, endTime } = activity
    console.log(`${user.username}正在进行投票`)
    let now = new Date()
    if (now.getTime() < startTime.getTime()) {
      throw new Error('选举的未开始，无法进行投票')
    }

    if (now.getTime() > endTime.getTime()) {
      throw new Error('选举的已结束，无法进行投票')
    }

    //允许投票个数
    let voteCountAllowed = parseInt(Math.ceil(candidateList.length / 2))
    console.log(`允许投票个数 ${voteCountAllowed}`)

    if (candidateListSelected.length !== voteCountAllowed) {
      throw new Error(`选中候选人 ${candidateListSelected.length}, 允许投票 ${voteCountAllowed}, 每个有效邮箱的投票个数为候选人的一半`)
    }

    if (candidateListSelected.length > 5) {
      throw new Error(`选中候选人 ${candidateListSelected.length}, 每个有效邮箱的投票个数不能多于5个`)
    }

    if (candidateListSelected.length < 2) {
      throw new Error(`选中候选人 ${candidateListSelected.length}, 每个有效邮箱的投票个数不能少于2个`)
    }

    let voteCount = await ElectionVotes.countDocuments({ 'user._id': user._id, 'activity._id': activity._id })
    if (voteCount > 0) {
      throw new Error('每个有效邮箱只能投票一次')
    }

    await ElectionVotes.create({ user, activity, candidateList: candidateListSelected })
  }
}

export default API