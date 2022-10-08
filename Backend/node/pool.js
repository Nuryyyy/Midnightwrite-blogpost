import  pg  from  "pg"
function  connectDatabase(){
	const  pool = new  pg.Pool ({

		user :  'postgres',
		password :  '070496',
		database :  'midnightwrite',
		host :  'localhost'

	})
		return  pool
	}
export { connectDatabase }