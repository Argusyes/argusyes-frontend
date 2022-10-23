export const serverManagementPageMaps = {
  tableDataMaps: {
    typeMap: {
      0: '主',
      1: '备',
    },
    usableMap: {
      0: '否',
      1: '是',
    },
    statusMap: {
      0: '运行中',
      1: '停止',
    },
  },
}

export const localeMaps = {
  localeValueToLngNumberMap: {
    zh: 0,
    en: 1,
  },
  localeValueToLangTextMap: {
    zh: '中文',
    en: 'Eng',
  },
}

export const genderMaps = {
  zhToEn: {
    男: 'Male',
    女: 'Female',
  },
  enToZh: {
    Male: '男',
    Female: '女',
    male: '男',
    female: '女',
  },
}

export const getDisplayGender = (input, lang) => {
  let result = 'error'
  if (lang === 'zh')
    result = genderMaps.enToZh[input] || input
  else if (lang === 'en')
    result = genderMaps.zhToEn[input] || input
  return result
}

