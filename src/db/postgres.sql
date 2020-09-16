SELECT m.member_id,
    m.member_name,
    i.issue_date
FROM
    member as m, issue as i
WHERE 
m.member_id = i.member_id
    AND i.issue_date BETWEEN TO_DATE('26-JAN-2011','DD-MON-YYYY') AND TO_DATE('14-APR-2011','DD-MON-YYYY');