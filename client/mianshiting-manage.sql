/* 题目 */
create table subject
(
   id                      varchar(255)                   not null,
   exam_id                 varchar(255)                   not null,
   type                    varchar(20)                    not null,
   subject_describe        varchar(50)                    not null,
   subject_type            varchar(10)                    not null,
   subject_title           text                           not null,
   subject_options_key     varchar(10)                    null,
   subject_options_value   varchar(500)                   null,
   /* 参考答案 */
   reference_answer        varchar(10)                    null,
   /* 解答过程 */
   answer_detail           text                           null,
   upload_time             varchar(20)                    null,
   /* 参考链接 */
   reference_linking       varchar(500)                    null,
   constraint PK_SUBJECT primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 试题表 */
create table exams
(
   id                      varchar(255)                   not null,
   title                   varchar(255)                   not null,
   exam_describe           varchar(255)                   not null,
   create_date             varchar(32)                    not null,
   author                  varchar(255)                   null,
   count                   int(8)                         not null,
   study_times             int(8)                         null,
   status                  int(1)                         null,
   /* 类型，表示是专项练习还是公司真题 */
   exam_type                    varchar(20)                    null,
   /* 如果是公司真题，公司的名字 */
   enterprise_name         varchar(10)                    null,
   constraint PK_SPECIAL_HOT primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



