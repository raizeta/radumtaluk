<?php
	#SELECT A.USER_ID,x3.NM_FIRST,x2.CUST_KD,x2.CUST_NM,A.CHECKIN_TIME,A.CHECKOUT_TIME FROM c0002scdl_detail A
	#RIGHT JOIN 
	#(SELECT max(CASE WHEN x1.CHECKIN_TIME THEN ID ELSE 
	#							(SELECT x.ID FROM c0002scdl_detail x WHERE x.USER_ID=x1.USER_ID AND x.TGL=x1.TGL limit 1)
	#					END) as ID, 
	#					max(x1.CHECKIN_TIME) as MAKS_CHECKIN,
	#					x1.USER_ID 
	#FROM c0002scdl_detail x1
     
	#WHERE x1.TGL=IN_TGL
	#GROUP BY x1.USER_ID) B on A.ID=B.ID
    #INNER JOIN c0001 x2 on A.CUST_ID = x2.CUST_KD
    #INNER JOIN dbm_086.user_profile x3 on A.USER_ID = x3.ID;

	SELECT A.USER_ID,x3.NM_FIRST,x2.CUST_KD,x2.CUST_NM,A.CHECKIN_TIME,A.CHECKOUT_TIME FROM c0002scdl_detail A
	RIGHT JOIN 
	(SELECT max(CASE WHEN x1.CHECKIN_TIME THEN ID ELSE 
								(SELECT x.ID FROM c0002scdl_detail x WHERE x.USER_ID=x1.USER_ID AND x.TGL=x1.TGL limit 1)
						END) as ID, 
						max(x1.CHECKIN_TIME) as MAKS_CHECKIN,
						x1.USER_ID 
	FROM c0002scdl_detail x1
     
	WHERE x1.TGL=IN_TGL
	GROUP BY x1.USER_ID) B on A.ID=B.ID
    INNER JOIN c0001 x2 on A.CUST_ID = x2.CUST_KD
    INNER JOIN dbm_086.user_profile x3 on A.USER_ID = x3.ID;


	#SELECT * FROM c0002scdl_detail A
	#RIGHT JOIN 
	#(SELECT max(CASE WHEN x1.CHECKIN_TIME THEN ID ELSE 
	#						(SELECT x.ID FROM c0002scdl_detail x WHERE x.USER_ID=x1.USER_ID AND x.TGL=x1.TGL limit 1)
	#				END) as ID, 
	#				max(x1.CHECKIN_TIME),
	#				x1.USER_ID 
	#FROM c0002scdl_detail x1 
	#WHERE x1.TGL=IN_TGL
	#GROUP BY x1.USER_ID) B on A.ID=B.ID;

	SELECT * FROM c0002scdl_detail A
	RIGHT JOIN 
	(SELECT max(CASE WHEN x1.CHECKIN_TIME THEN ID ELSE 
							(SELECT x.ID FROM c0002scdl_detail x WHERE x.USER_ID=x1.USER_ID AND x.TGL=x1.TGL limit 1)
					END) as ID, 
					max(x1.CHECKIN_TIME),
					x1.USER_ID 
	FROM c0002scdl_detail x1 
	WHERE x1.TGL=IN_TGL
	GROUP BY x1.USER_ID) B on A.ID=B.ID;