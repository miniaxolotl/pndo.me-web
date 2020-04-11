import { useRouter } from 'next/router'
import os from 'os'
import { FaQuestionCircle, FaTimesCircle, FaWindowClose, FaExternalLinkSquareAlt } from 'react-icons/fa';

function DownloadList({ data, filterFunc }: any) {

  const router = useRouter();

  	const copyFunc = (e: any) => {
		e.target.select();
		document.execCommand("copy");
	}

	let listItems;
	
	if(data) {
		listItems = data?.map((item) => {
		let style = (item.loaded < item.total) ? 'progress-info' : 'progress-success';
		
		if(item.loaded < 0) {
			style = 'progress-error';
		}

		const text = (item.loaded < item.total) ? 'uploading...'
		: 'http://'+os.hostname()+':3000/file/'+item.id;

		return (<li key={item.id} id={item.id}>
				<label className="dl-container">
					<div className="dl-text">
						<a className="dl-link" href="/" onClick={(e) => filterFunc(item.id, e)}
						id={item.id}>
							<FaWindowClose />
						</a>
						<a className="dl-link" href={'/file/'+item.id}>
							<FaExternalLinkSquareAlt />
						</a>
						<span>
							{item.name}
						</span>
					</div>
				</label>
				<div>
					<input type="text" className="full-width text-center" value={text} onClick={copyFunc} readOnly />
					<progress className={style} value={item.loaded} max={item.total} />
				</div>
			</li>);
		});
	}
	
  return (
    <ul className="download">
		{listItems}
    </ul>
  )
}

export default DownloadList;