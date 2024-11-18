import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const ReturnPolicy = () => {

  return (
	<div class="container">
		<div class="main" >
			<div class="page-empty-banner col-lg-12 col-md-12 col-sm-12">
				<div >&nbsp;</div>
				<div class="col-main">
					<p ><span><span><strong>CHÍNH SÁCH ĐỔI / TRẢ </strong><strong>/</strong><strong> HOÀN TIỀN</strong></span></span></p>
					<p><strong>Áp dụng cho toàn bộ đơn hàng của Quý </strong><strong>K</strong><strong>hách tại&nbsp;</strong><a href="http://www.Bookee.com/"><strong>Bookee.com</strong></a></p>
					{/* <p style="text-align: center;"><strong><img style="text-align: center;" src="https://cdn0.Bookee.com/media/wysiwyg/Hien_UI/QuyTrinhDoiTra/DoiTraHang400x400_01.svg" alt="Bookee" width="390" height="390"></strong>
						<strong><img style="text-align: center;" src="https://cdn0.Bookee.com/media/wysiwyg/Hien_UI/QuyTrinhDoiTra/DoiTraHang400x400_02.svg" alt="Bookee" width="390" height="390"></strong>
						<strong><img style="text-align: center;" src="https://cdn0.Bookee.com/media/wysiwyg/Hien_UI/QuyTrinhDoiTra/DoiTraHang400x400_03.svg" alt="Bookee" width="390" height="390"></strong>
					</p> */}
					<p>&nbsp;</p>
					<p>Chúng tôi luôn trân trọng sự tin tưởng và ủng hộ của quý khách hàng khi trải nghiệm mua hàng tại <a href="http://www.Bookee.com/"><strong>Bookee.com</strong></a>. Do đó chúng tôi luôn cố gắng hoàn thiện dịch vụ tốt nhất để phục vụ mọi nhu cầu mua sắm của quý khách.</p>
					<p><a href="http://www.Bookee.com/"><strong>Bookee.com</strong></a> chúng tôi luôn luôn cam kết tất cả các sản phẩm bán tại <a href="http://www.Bookee.com/"><strong>Bookee.com</strong></a> 100% là những sản phẩm chất lượng và xuất xứ nguồn gốc rõ ràng, hợp pháp cũng như an toàn cho người tiêu dùng. Để việc mua sắm của quý khách tại <a href="http://www.Bookee.com/"><strong>Bookee.com</strong></a> là trải nghiệm dịch vụ thân thiện, chúng tôi hy vọng quý khách sẽ kiểm tra kỹ các nội dung sau trước khi nhận hàng:&nbsp;</p>
					<ul>
						<li>
							<p>Thông tin sản phẩm: tên sản phẩm và chất lượng sản phẩm.</p>
						</li>
						<li>
							<p>Số lượng sản phẩm.</p>
						</li>
					</ul>
					<p>Trong trường hợp hiếm hoi sản phẩm quý khách nhận được có khiếm khuyết, hư hỏng hoặc không như mô tả, Bookee.com cam kết bảo vệ khách hàng bằng chính sách đổi trả/ hoàn tiền trên tinh thần bảo vệ quyền lợi người tiêu dùng nhằm cam kết với quý khách về chất lượng sản phẩm và dịch vụ của chúng tôi.</p>
					<p>Khi quý khách hàng có hàng hóa mua tại <a href="http://www.Bookee.com/"><strong>Bookee.com</strong></a> cần đổi/ trả/bảo hành/hoàn tiền, xin quý khách hàng liên hệ với chúng tôi qua hotline <strong>1900 0099</strong> hoặc truy cập <a href="http://www.Bookee.com/support/return-policy"><strong>Bookee.com/chinh-sach-doi-tra-hang</strong></a> để tìm hiểu thêm về chính sách đổi/trả:<a ></a></p>
					<strong>1. Thời gian áp dụng đổi/trả</strong>
					<table class="table table-bordered" >
						<tbody>
							<tr>
								<td>
									<p>&nbsp;</p>
								</td>
								<td>
									<p><strong>KỂ TỪ KHI </strong><strong>Bookee.com </strong><strong>GIAO HÀNG THÀNH CÔNG</strong></p>
								</td>
								<td>
									<p><strong>SẢN PHẨM LỖI (do nhà cung cấp)</strong></p>
								</td>
								<td>
									<p><strong>SẢN PHẨM KHÔNG LỖI&nbsp;(*)</strong></p>
								</td>
								<td>
									<p><strong>SẢN PHẨM LỖI DO NGƯỜI SỬ DỤNG</strong></p>
								</td>
							</tr>
							
							<tr>
								<td rowspan="3">
									<p>Voucher/ E-voucher</p>
								</td>
								<td rowspan="2">
									<p>30 ngày đầu tiên</p>
								</td>
								<td>
									<p>Đổi mới</p>
								</td>
								<td rowspan="2">
									<p>Không hỗ trợ đổi/ trả</p>
								</td>
								<td rowspan="2">
									<p>Không hỗ trợ đổi/ trả</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>Trả hàng không thu phí</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>30 ngày trở đi</p>
								</td>
								<td colspan="3">
									<p>Không hỗ trợ đổi trả</p>
								</td>
							</tr>
							<tr>
								<td rowspan="3">
									<p>Sách, Vở, Báo Chí</p>
								</td>
								<td rowspan="2">
									<p>30 ngày đầu tiên</p>
								</td>
								<td>
									<p>Đổi mới</p>
								</td>
								<td rowspan="2">
									<p>Trả hàng không thu phí</p>
								</td>
								<td rowspan="3">
									<p>Không hỗ trợ đổi/ trả</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>Trả không thu phí</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>30 ngày trở đi</p>
								</td>
								<td colspan="2">
									<p>Không hỗ trợ đổi/ trả</p>
								</td>
							</tr>
						</tbody>
					</table>
					<p>&nbsp;</p>
					<ul>
						<li>
							<p>Quý khách vui lòng thông báo về cho Bookee.com ngay khi:</p>
							<p>		+ Kiện hàng giao tới ngoại quan bên ngoài có dấu hiệu hư hại , sản phẩm bên trong trầy xước ,gãy bìa,  rách, móp méo, ướt , bể vỡ...trong vòng 2 ngày kể từ khi nhận hàng thành công.</p>
							<p>		+ Sản phẩm giao tới bị sai hàng , giao thiếu hàng trong vòng 2 ngày kể từ khi nhận hàng thành công.</p>
						</li>
						<li>
							<p>Sau khi Bookee.com xác nhận mail tiếp nhận yêu cầu kiểm tra xử lý, Bookee.com sẽ liên hệ đến quý khách để xác nhận thông tin hoặc nhờ bổ sung thông tin (nếu có). Trường hợp không liên hệ được Bookee.com rất tiếc xin được phép từ chối xử lý yêu cầu. Thời gian Bookee.com liên hệ trong giờ hành chính tối đa 3 lần trong vòng 7 ngày sau khi nhận thông tin yêu cầu.</p>
						</li>
						<li>
							<p>Chúng tôi sẽ kiểm tra các trường hợp trên và giải quyết cho quý khách tối đa trong 30 ngày làm việc kể từ khi quý khách nhận được hàng, quá thời hạn trên rất tiếc chúng tôi không giải quyết khiếu nại.</p>
						</li>
					</ul>
					<p ><strong>2. Các trường hợp yêu cầu đổi trả</strong></p>
					<ul>
						<li>
							<p>Lỗi kỹ thuật của sản phẩm - do nhà cung cấp (sách thiếu trang, sút gáy, trùng nội dung, sản phẩm điện tử, đồ chơi điện – điện tử không hoạt động..)</p>
						</li>
						<li>
							<p>Giao nhầm/ giao thiếu (thiếu sản phẩm đã đặt, thiếu phụ kiện, thiếu quà tặng kèm theo)</p>
						</li>
						<li>
							<p>Chất lượng hàng hóa kém, hư hại do vận chuyển.</p>
						</li>
						<li>
							<p>Hình thức sản phẩm không giống mô tả ban đầu.</p>
						</li>
						<li>
							<p>Quý khách đặt nhầm/ không còn nhu cầu (*)</p>
						</li>
					</ul>
					<p>(*) Đối với các Sản phẩm không bị lỗi, chỉ áp dụng khi sản phẩm đáp ứng đủ điều kiện sau:</p>
					<p>Quý khách&nbsp;có thể trả lại sản phẩm đã mua tại&nbsp;<strong>Bookee.com</strong> trong vòng 30 ngày kể từ khi nhận hàng với đa số sản phẩm khi thỏa mãn các điều kiện sau:</p>
					<ul>
						<li>
							<p>Sản phẩm không có dấu hiệu đã qua sử dụng, còn nguyên tem, mác hay niêm phong của nhà sản xuất.</p>
						</li>
						<li>
							<p>Sản phẩm còn đầy đủ phụ kiện hoặc phiếu bảo hành cùng quà tặng kèm theo (nếu có).</p>
						</li>
						<li>
							<p>Nếu là sản phẩm điện – điện tử thì chưa bị kích hoạt, chưa có sao ghi dữ liệu vào thiết bị.</p>
						</li>
					</ul>
					<strong>3. Điều kiện đổi trả</strong>
					<p><strong>Bookee.com</strong> hỗ trợ đổi/ trả sản phẩm cho quý khách nếu:</p>
					<ul>
						<li>
							<p>Sản phẩm còn nguyên bao bì như hiện trạng ban đầu.</p>
						</li>
						<li>
							<p>Sản phầm còn đầy đủ phụ kiện, quà tặng khuyến mãi kèm theo.</p>
						</li>
						<li>
							<p>Hóa đơn GTGT (nếu có).</p>
						</li>
						<li>
							<p>Cung cấp đầy đủ thông tin đối chứng theo yêu cầu (điều 4).</p>
						</li>
					</ul>
					<p ><strong>4. Quy trình đổi trả</strong></p>
					<ul>
						<li>
							<p>Quý khách vui lòng thông tin đơn hàng cần hỗ trợ đổi trả theo Hotline 1900636467 hoặc email về địa chỉ: <strong>cskh@Bookee.com.vn</strong> với tiêu đề <strong>“Đổi Trả Đơn Hàng " Mã đơn hàng".</strong></p>
						</li>
						<li>
							<p>Quý khách cần cung cấp đính kèm thêm các bằng chứng để đối chiếu/ khiếu nại sau:</p>
						</li>
					</ul>
					<p >+ Video clip quay rõ các mặt của kiện hàng trước khi khui để thể hiện tình trạng của kiện hàng.</p>
					<p>+ Video clip mở kiện hàng từ lúc bắt đầu khui ngoại quan đến kiểm tra sản phẩm bên trong thùng hàng.</p>
					<p >+ Video quay rõ nét , không mờ , nhoè, thể hiện đầy đủ thông tin mã đơn hàng và quay cận cảnh lỗi của sản phẩm.</p>
					<p >+ Hình chụp tem kiện hàng có thể hiện mã đơn hàng.</p>
					<p >+ Hình chụp tình trạng ngoại quan (băng keo, seal, hình dạng thùng hàng, bao bì), đặc biệt các vị trí nghi ngờ có tác động đến sản phẩm (móp méo, ướt, rách...)</p>
					<p>+ Hình chụp tình trạng sản phẩm bên trong, nêu rõ lỗi kỹ thuật nếu có.</p>
					<ul>
						<li>Để đảm bảo quyền lợi khách hàng và để <strong>Bookee.com</strong> có cơ sở làm việc với các bộ phận liên quan, tất cả yêu cầu đổi/ trả/ bảo hành quý khách cần cung cấp hình ảnh/ clip sản phẩm lỗi. Quá thời gian đổi/ trả sản phẩm nếu chưa nhận được đủ hình ảnh/ clip từ quý khách, <strong>Bookee.com</strong> xin phép từ chối hỗ trợ.</li>
					</ul>
					<table class="table table-bordered" >
						<tbody>
							<tr>
								<td>
									<p><strong>STT</strong></p>
								</td>
								<td>
									<p><strong>Nội dung</strong></p>
								</td>
								<td>
									<p><strong>Cách thức giải quyết</strong></p>
								</td>
							</tr>
							<tr>
								<td>
									<p>1</p>
								</td>
								<td>
									<p>Lỗi kỹ thuật của sản phẩm - do nhà cung cấp (sách thiếu trang, sút gáy, trùng nội dung, sản phẩm điện tử không hoạt động..)</p>
								</td>
								<td>
									<p>Bookee.com có sản phẩm→ đổi mới cùng sản phẩm</p>
									<p>Bookee.com hết hàng→ Hoàn tiền hoặc quý khách có thể chọn mặt hàng khác tại website <span ><a href="http://www.Bookee.com/">www.Bookee.com</a></span>.</p>
									<p>Đổi/trả không thu phí</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>2</p>
								</td>
								<td>
									<p>Sản phẩm hỏng do quý khách</p>
								</td>
								<td>
									<p>Không hỗ trợ đổi/ trả</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>3</p>
								</td>
								<td>
									<p>Lý do đổi/trả sản phẩm như: khách đặt nhầm hoặc không còn nhu cầu.</p>
								</td>
								<td>
									<p>Hỗ trợ thu hồi và hoàn tiền 100% giá trị sản phẩm cho quý khách hàng.</p>
									<p>**Lưu ý: Bookee.com rất tiếc sẽ không hỗ trợ hoàn lại chi phí vận chuyển trong đơn hàng cho trường hợp này.</p>
									<p>Đổi /trả không thu phí</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>4</p>
								</td>
								<td>
									<p>Giao nhầm/ giao thiếu (thiếu sản phẩm đã đặt, thiếu phụ kiện, thiếu quà tặng kèm theo)</p>
								</td>
								<td>
									<p>Giao nhầm → Đổi lại đúng sản phẩm đã đặt.</p>
									<p>Giao thiếu → Giao bù thêm số lượng còn thiếu theo đơn hàng.</p>
									<p>Đổi /trả không thu phí</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>5</p>
								</td>
								<td>
									<p>Chất lượng hàng hóa kém do vận chuyển</p>
								</td>
								<td>
									<p>Khi quý khách hàng nhận gói hàng bị móp méo, ướt, chúng tôi khuyến cáo khách hàng nên kiểm tra thực tế hàng hóa bên trong ngay thời điểm nhận hàng, vui lòng phản ảnh hiện trang hàng hóa lên bill nhận hàng từ phía nhân viên giao nhận và liên lạc với chúng tôi về hotline 1900-636467 trong vòng 48 giờ để được hỗ trợ giải quyết cụ thể.</p>
									<p>Đổi /trả không thu phí</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>6</p>
								</td>
								<td>
									<p>Hình thức sản phẩm không giống mô tả ban đầu</p>
								</td>
								<td>
									<p>Hãy liên hệ với chúng tôi qua số hotline 1900636467, chúng tôi sẵn sàng lắng nghe và giải quyết cho bạn (cụ thể theo từng trường hợp).</p>
									<p>Đổi /trả không thu phí</p>
								</td>
							</tr>
						</tbody>
					</table>
					<p>&nbsp;</p>
					<p ><strong>5. Cách thức chuyển sản phẩm đổi trả về </strong><a href="http://www.Bookee.com/"><strong>Bookee.com</strong></a></p>
					<ul>
						<li>
							<p>Khi yêu cầu đổi trả được giải quyết, quý khách vui lòng đóng gói sản phẩm như hiện trạng khi nhận hàng ban đầu (bao gồm sản phẩm, quà tặng, phụ kiện kèm theo sản phẩm,…nếu có).</p>
						</li>
						<li>
							<p>Hóa đơn giá trị gia tăng của <a href="http://www.Bookee.com/"><strong>Bookee.com</strong></a> (nếu có).</p>
						</li>
						<li>
							<p>Phụ kiện đi kèm sản phẩm và quà tặng khuyến mãi kèm theo (nếu có).</p>
						</li>
						<li>
							<p>Quý khách cần quay video clip đóng gói sản phẩm để làm bằng chứng đối chiếu/ khiếu nại liên quan đến đổi trả về sau (nếu cần).</p>
						</li>
						<li>
							<p>Quý khách vui lòng chịu trách nhiệm về trạng thái nguyên vẹn của sản phẩm khi gửi về <a href="http://www.Bookee.com/"><strong>Bookee.com</strong></a><strong>.</strong><strong>&nbsp;</strong></p>
						</li>
						<li>
							<p>Sau khi nhận được sản phẩm quý khách gởi về, <a href="http://www.Bookee.com/"><strong>Bookee.com</strong></a> sẽ phản hồi và cập nhật thông tin trên từng giai đoạn xử lý đến quý khách qua điện thoại/email .</p>
						</li>
					</ul>
					<p><strong>Lưu ý khác:</strong></p>
					<p>(*) Các sản phẩm thuộc "Phiên chợ sách cũ", "Sách cũ đồng giá" sẽ không được áp dụng chính sách đổi trả của <strong>Bookee.com</strong>.</p>
					<p>(*) Nếu quý khách hủy đơn hàng cũ, đã thanh toán thành công, mà không có nhu cầu đặt lại đơn hàng khác, hoặc quý khách yêu cầu trả hàng hoàn tiền → chúng tôi sẽ hoàn tiền lại cho quý khách qua hình thức thanh toán ban đầu, đối với các đơn hàng quý khách thanh toán bằng tiền mặt sẽ được hoàn qua tài khoản Ngân hàng do quý khách chỉ định</p>
					<p>Thời gian hoàn tiền được quy định tại Điều 6.</p>
					<p>(*) Không áp dụng đổi / trả / hoàn tiền đối với mặt hàng Chăm Sóc Cá Nhân và các Đơn Hàng Bán Sỉ.</p>
					<p><strong>6. Thời gian hoàn tiền</strong></p>
					<ul>
						<li>
							<p>Đối với những đơn hàng thanh toán trả trước: sau khi cập nhật hủy, thời gian hoàn tiền sẽ tùy thuộc vào phương thức thanh toán. Quý khách vui lòng tham khảo thời gian hoàn tiền như sau: &nbsp;</p>
						</li>
					</ul>
					<table class="table table-bordered " >
						<tbody>
							<tr>
								<td>
									<p><strong>Phương thức thanh toán</strong></p>
								</td>
								<td>
									<p><strong>Thời gian hoàn tiền</strong></p>
								</td>
							</tr>
							<tr>
								<td>
									<p>ATM nội địa/ Cổng Zalo Pay/ Cổng VNPay</p>
								</td>
								<td>
									<p>5 - 7 ngày làm việc</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>Chuyển khoản</p>
								</td>
								<td>
									<p>5 - 7 ngày làm việc</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>Visa/ Master/ JCB</p>
								</td>
								<td>
									<p>5 - 7 ngày làm việc (*)</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>Ví Momo/ Moca/Zalopay/ShopeePay</p>
								</td>
								<td>
									<p>1 - 3 ngày làm việc</p>
								</td>
							</tr>
							<tr>
								<td>
									<p>Fpoint</p>
								</td>
								<td>
									<p>24 giờ</p>
								</td>
							</tr>
						</tbody>
					</table>
					<p> (*) Lưu ý: - Đối với thẻ Visa/ Master/ JCB,&nbsp; số tiền hoàn sẽ được ngân hàng chuyển vào tài khoản quý khách dao động 1-3 tuần làm việc (tùy theo chính sách của từng ngân hàng).&nbsp; - Ngày làm việc không bao gồm thứ 7, chủ nhật và ngày lễ.</p>
					<ul>
						<li>
							<p>Đối với những đơn hàng trả hàng hoàn tiền:</p>
						</li>
						<li>
							<p>Thời gian hoàn tiền được bắt đầu tính kể từ thời điểm Bookee.com nhận được hàng hoàn trả và xác nhận với quý khách về việc hàng hoàn trả đáp ứng các điều kiện trả hàng được quy định tại chính sách này. Thời gian hoàn tiền tuân thủ theo quy định tại Mục 6 này.</p>
						</li>
						<li>
							<p>Đối với các đơn hàng hoàn tiền, hình thức thanh toán của quý khách là tiền mặt (COD): Bookee.com sẽ hoàn tiền qua tài khoản Ngân hàng do quý khách chỉ định.</p>
						</li>
					</ul>
					<p>Trong trường hợp đã quá thời gian trên quý khách chưa nhận được tiền hoàn, vui lòng liên hệ ngân hàng phát hành thẻ hoặc liên hệ bộ phận Chăm sóc khách hàng của Bookee.com .&nbsp;</p>
					<p><strong>Nếu cần hỗ trợ thêm</strong><strong> bất kì thông tin nào, Bookee nhờ</strong><strong> quý khách liên hệ trực tiếp qua </strong><strong>hotline 1900 0099</strong><strong> để được hỗ trợ nhanh chóng.</strong></p>
					<p>&nbsp;</p>
					<p><em>Chính sách sẽ được áp dụng và có</em><em> hiệu lực</em><em> từ ngày </em><em>12/11/2024</em></p>
				</div>
			</div>
		</div>
	</div>
	)
}

export default ReturnPolicy