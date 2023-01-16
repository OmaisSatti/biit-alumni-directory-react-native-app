import styled from 'styled-components';
export const ContainerLst = styled.View`
  flex: 1;
  padding-left: 5px;
  padding-right: 5px;
  align-items: center;
`;

export const Card = styled.View`
  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImgWrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
  border-bottom-width: 1px;
  border-bottom-color: red;
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color:black;
  font-family: 'Lato-Regular';
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color:red;
  font-family: 'Lato-Regular';
`;

export const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;
export const RemoveBtn = styled.TouchableOpacity`
  font-size: 20px;
  font-weight: bold;
  color:green;
  font-family: 'Lato-Regular';
`;
export const UpdateBtn = styled.TouchableOpacity`
  font-size: 20px;
  font-weight: bold;
  color:black;
  font-family: 'Lato-Regular';
`;
