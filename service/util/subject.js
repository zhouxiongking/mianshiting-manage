const cheerio = require('cheerio');

// 爬取题目内容
exports.crawSubject = ({ tid, qid, subjectType, contentType }) => {
  return new Promise((resolve, reject) => {
    const url = `https://www.nowcoder.com/test/question/done?tid=${tid}&qid=${qid}`;
		request
      .get(url)
      .set('Cookie', 'NOWCODERCLINETID=7E5D7A67149BB1B16625EAE9A109030D; NOWCODERUID=5C273A64D46AC8C07E6BFE85DF58C731; gr_user_id=2a93a777-0735-4086-adec-7b36e0a2b1c4; c196c3667d214851b11233f5c17f99d5_gr_last_sent_cs1=770342; Hm_lvt_a808a1326b6c06c437de769d1b85b870=1621511340,1621511945; c196c3667d214851b11233f5c17f99d5_gr_session_id=31c6bf89-cc9c-4cbb-aedf-e33259461893; c196c3667d214851b11233f5c17f99d5_gr_last_sent_sid_with_cs1=31c6bf89-cc9c-4cbb-aedf-e33259461893; c196c3667d214851b11233f5c17f99d5_gr_session_id_31c6bf89-cc9c-4cbb-aedf-e33259461893=true; callBack=%2Ftest%2Fquestion%2Fdone%3Ftid%3D44464157%26qid%3D501229%26headNav%3Dwww; t=D49BF99D189425575249EB183D0A808D; SERVERID=01ca37401d33369101f3ce5bd23561b1|1621515506|1621511469; c196c3667d214851b11233f5c17f99d5_gr_cs1=770342; Hm_lpvt_a808a1326b6c06c437de769d1b85b870=1621515377')
      .end((err, res) => {
        if (err) {
          console.log((err));
          reject(err);
        }
        const $ = cheerio.load(res.text, {decodeEntities: false});
        // 题目名称
        const subject_title = $('.question-main').text();
        // 选项
        const subject_options_key = [];
        const subject_options_value = [];
        const optionMap = {
          0: 'A',
          1: 'B',
          2: 'C',
          3: 'D',
          4: 'E',
          5: 'F'
        };
        // 选项内容
        $('.result-answer-item pre').each(function(index) {
          subject_options_key.push(optionMap[index]);
          subject_options_value.push($(this).text().trim());
        });
        // 参考答案
        const text = $('.result-subject-answer h1').text();
        const arr = text.split(':');
        const reference_answer = arr[1].replace('你的答案', '').trim().split('\n').join(',');
        resolve({
          subject_title,
          subject_options_key: subject_options_key.join('-'),
          subject_options_value: subject_options_value.join('////'),
          subject_type: subjectType,
          reference_answer,
          type: contentType,
          subject_describe: `${contentType}专项练习`
        });
      });
	}).then(response => response);


};
