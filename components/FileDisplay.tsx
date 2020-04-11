/**
 * Header.tsx
 * Header
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-02-20
 */

import { FaFile, FaFileAlt, FaRegFile, FaFileImage } from "react-icons/fa";
import { useRouter } from "next/router";

interface Props {
	data: any;
}

const FileDisplay: React.FunctionComponent<Props> =
	({ data }) => { 

	const router = useRouter();

	const humanFileSize = (bytes, si)  => {
		var thresh = si ? 1000 : 1024;
		if(Math.abs(bytes) < thresh) {
			return bytes + ' B';
		}
		var units = si
			? ['KB','MB','GB','TB','PB','EB','ZB','YB']
			: ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
		var u = -1;
		do {
			bytes /= thresh;
			++u;
		} while(Math.abs(bytes) >= thresh && u < units.length - 1);
		return bytes.toFixed(1)+' '+units[u];
	};

	let image = false;
	if(data.type.includes("jpeg") || data.type.includes("png") || data.type.includes("gif") || data.type.includes("webp") || data.type.includes("jpg") || data.type.includes("svg") || data.type.includes("apng")){
		image = true;
	}

	return (
		<div className="container">
			<div>
				<div>
						{
							image ? <FaFileImage /> : <FaRegFile />
						} {data.name} 
				</div>
				<div className="file-display">
					<div>
						<div className='img-container'>
							<img src={'http://home.emawa.io:5656/download/'+data.id} />
						</div>
						
						<div>
							<div>
								size
								<code> 
									{humanFileSize(data.bytes, true)}
								</code>
							</div>
							<div>
								upload date
								<code> 
									{data.uploaded}
								</code>
							</div>
							<div>
								uploaded by:
								<code>
									{data.owner_id ? data.owner_id : 'anonymous user'}
								</code>
							</div>
						</div>
					</div>
					<div>
						<a href={'http://home.emawa.io:5656/download/'+data.id}>
							<button className="outline" >
								download
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FileDisplay;