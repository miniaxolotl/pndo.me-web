import { useRouter } from 'next/router'
import os from 'os'
import { FaQuestionCircle, FaTimesCircle, FaWindowClose, FaExternalLinkSquareAlt } from 'react-icons/fa';

import config from "../config.json";

import styles from "./uploadlist.module.scss"

interface Props {
	uploadList: FileMetadata[];
	filterFunc: (e, i) => any;
};

const UploadList: React.FunctionComponent<Props> = (props) => {

  const router = useRouter();

  	const copyFunc = (e: any) => {
		e.target.select();
		document.execCommand("copy");
	}

	let listItems;
	
	if(props.uploadList.length > 0) {
		listItems = props.uploadList?.map((item) => {

			let text = ((item.curUpload < item.maxUpload) || !item.file_id)
			? 'uploading...'
			: config.url+'/file/'+item.file_id;

			let style = ((item.curUpload < item.maxUpload) || !item.file_id)
			? 'progress-info' : 'progress-success';
			
			if((item.maxUpload == item.curUpload) && !item.filename) {
				text = 'error during upload...'
				style = 'progress-error';
			}
			const owner = item.owner ? item.owner : 'anonymous user';

			let isImage = false;
			if(item.type && !item.protected) {
				// isImage = item.type.includes("image") ? true : false;
			}

			return (<li key={item.timeInitiated} id={item.file_id}>
					<label className={`${styles.dlItem}`}>
						<div className={`${styles.dlText}`}>
							<a className={styles.delLink} onClick={(e) => props.filterFunc(item.file_id, e)}
							id={item.file_id}>
								<FaWindowClose />
							</a>
							<a className={`${styles.dlLink}`} href={'/file/'+item.file_id}>
								<FaExternalLinkSquareAlt />
							</a>
							<span>
								{item.filename}
								<code>{owner}</code>
							</span>
						</div>
						<div>
							<progress
							className={style}
							value={item.curUpload} max={item.maxUpload} />
							<input type="text" className="full-width text-center" value={text} onClick={copyFunc} readOnly />
							{			
								(() => {
									if(isImage) {
									return (
										<img src={`${config.api}/api/file/download/${item.file_id}`} className={styles.image} />
									)
								}
							})()
							}
						</div>
					</label>
				</li>);
		});
	}
	
  return (
    <ul className={`${styles.dlContainer}`}>
		{listItems}
    </ul>
  )
}

export default UploadList;