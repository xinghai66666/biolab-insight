'use strict';

module.exports = {
  id: "indirect_elisa",
  name: "间接 ELISA",
  category: "分析检测",
  short: "固相抗原捕获样品抗体，再加酶标二抗显色，用于抗体定性与半定量检测",
  overview: {
    principle: "已知抗原包被板孔，样品中的特异性抗体与其结合；加入酶标二抗识别抗体 Fc 段，底物显色强度与结合抗体量正相关。",
    application: "血清或培养上清中特异性抗体效价测定与免疫应答评价。",
    input: "包被抗原、待测血清或上清样品、酶标二抗与显色底物。",
    output: "各孔吸光度、抗体效价或相对浓度（OD 值或滴度）。",
    duration: "约 3-4 h",
    yield: "不适用（检测型方法）"
  },
  keySpecs: [
    { label: "包被", value: "抗原 1–10 µg/mL，4 °C 过夜或 37 °C 2 h", note: "碳酸盐缓冲液 pH 9.6" },
    { label: "封闭", value: "1–5% BSA 封闭液，37 °C 1 h", note: "降低非特异结合" },
    { label: "样品孵育", value: "37 °C 1 h 或 4 °C 过夜", note: "系列稀释测效价" },
    { label: "酶标二抗", value: "按说明书稀释，37 °C 30–60 min", note: "避免交叉反应" },
    { label: "显色", value: "TMB 避光 10–30 min，450 nm 读数", note: "按时终止反应" }
  ],
  steps: [
    {
      no: 1,
      phase: "包被",
      title: "抗原包被",
      purpose: "将抗原固定于固相载体表面。",
      summary: "用包被缓冲液将抗原稀释至 1–10 µg/mL，每孔 100 µL，4 °C 过夜或 37 °C 2 h。",
      detail: "用包被缓冲液将抗原稀释至 1–10 µg/mL，每孔 100 µL，4 °C 过夜或 37 °C 2 h。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用包被缓冲液将抗原稀释至 1–10 µg/mL，每孔 100 µL，4 °C 过夜或 37 °C 2 h。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "抗原 1–10 µg/mL", value: "抗原 1–10 µg/mL" },
        { label: "100 µL/孔", value: "100 µL/孔" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "包被浓度不当导致信号弱或背景高", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 2,
      phase: "洗涤",
      title: "洗板",
      purpose: "去除未结合抗原，降低背景。",
      summary: "弃去包被液，用 PBST 洗 3 次，每次 200–300 µL/孔，拍干。",
      detail: "弃去包被液，用 PBST 洗 3 次，每次 200–300 µL/孔，拍干。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "弃去包被液，用 PBST 洗 3 次，每次 200–300 µL/孔，拍干。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "PBST 洗 3 次", value: "PBST 洗 3 次" },
        { label: "200–300 µL/孔", value: "200–300 µL/孔" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "洗板不充分导致背景偏高", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 3,
      phase: "封闭",
      title: "封闭",
      purpose: "封闭未结合位点，减少非特异吸附。",
      summary: "每孔加 1–5% BSA 封闭液 200 µL，37 °C 孵育 1 h，洗板。",
      detail: "每孔加 1–5% BSA 封闭液 200 µL，37 °C 孵育 1 h，洗板。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "每孔加 1–5% BSA 封闭液 200 µL，37 °C 孵育 1 h，洗板。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "BSA 1–5%", value: "BSA 1–5%" },
        { label: "37 °C 1 h", value: "37 °C 1 h" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "封闭不足导致高背景", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 4,
      phase: "加样",
      title: "加入样品",
      purpose: "让样品抗体与包被抗原充分结合。",
      summary: "待测血清或上清作系列稀释，每孔 100 µL，37 °C 孵育 1 h，设空白与阴性、阳性对照。",
      detail: "待测血清或上清作系列稀释，每孔 100 µL，37 °C 孵育 1 h，设空白与阴性、阳性对照。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "待测血清或上清作系列稀释，每孔 100 µL，37 °C 孵育 1 h，设空白与阴性、阳性对照。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "样品 100 µL/孔", value: "样品 100 µL/孔" },
        { label: "37 °C 1 h", value: "37 °C 1 h" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "稀释倍数不当导致信号超出线性范围", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 5,
      phase: "洗板",
      title: "洗板",
      purpose: "去除未结合的抗体。",
      summary: "PBST 洗 3–5 次并拍干，避免孔间交叉污染。",
      detail: "PBST 洗 3–5 次并拍干，避免孔间交叉污染。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "PBST 洗 3–5 次并拍干，避免孔间交叉污染。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "洗 3–5 次", value: "洗 3–5 次" },
        { label: "拍干", value: "拍干" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "残留抗体导致背景升高", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 6,
      phase: "二抗",
      title: "加酶标二抗",
      purpose: "放大特异性结合信号。",
      summary: "每孔加稀释后的酶标二抗 100 µL，37 °C 孵育 30–60 min，洗板。",
      detail: "每孔加稀释后的酶标二抗 100 µL，37 °C 孵育 30–60 min，洗板。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "每孔加稀释后的酶标二抗 100 µL，37 °C 孵育 30–60 min，洗板。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "酶标二抗 100 µL/孔", value: "酶标二抗 100 µL/孔" },
        { label: "37 °C 30–60 min", value: "37 °C 30–60 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "二抗浓度过高导致背景升高", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 7,
      phase: "显色",
      title: "显色与终止",
      purpose: "将结合量转化为可测吸光度。",
      summary: "每孔加 TMB 底物 100 µL，避光显色 10–30 min，加终止液后在 450 nm 读数。",
      detail: "每孔加 TMB 底物 100 µL，避光显色 10–30 min，加终止液后在 450 nm 读数。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "每孔加 TMB 底物 100 µL，避光显色 10–30 min，加终止液后在 450 nm 读数。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "TMB 100 µL", value: "TMB 100 µL" },
        { label: "避光 10–30 min", value: "避光 10–30 min" },
        { label: "450 nm", value: "450 nm" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "显色过久导致高浓度孔饱和", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 8,
      phase: "判读",
      title: "结果判读与记录",
      purpose: "给出抗体检测结果并保证可追溯。",
      summary: "计算扣除空白后的 OD，按 S/P 值或效价判定阴阳性，记录包被、稀释与读数。",
      detail: "计算扣除空白后的 OD，按 S/P 值或效价判定阴阳性，记录包被、稀释与读数。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "计算扣除空白后的 OD，按 S/P 值或效价判定阴阳性，记录包被、稀释与读数。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "S/P ≥1 判阳性（按方法规定）", value: "S/P ≥1 判阳性（按方法规定）" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "未设对照导致判读无依据", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    }
  ],
  references: [
    "间接 ELISA 通用实验 SOP",
    '公开药典指导原则与行业通用技术资料'
  ]
};
