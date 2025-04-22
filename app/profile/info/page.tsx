"use client"

import { useState, useEffect } from "react"
import { X, Edit, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { TopNav } from "@/components/top-nav"
import { AvatarUpload } from "@/components/avatar-upload"
import { useUser } from "@/contexts/user-context"

export default function PersonalInfoPage() {
  const { toast } = useToast()
  const { userInfo, updateUserInfo } = useUser()

  const [isEditing, setIsEditing] = useState(false)
  const [editedInfo, setEditedInfo] = useState({ ...userInfo })

  useEffect(() => {
    setEditedInfo({ ...userInfo })
  }, [userInfo])

  const handleEditToggle = () => {
    if (isEditing) {
      updateUserInfo(editedInfo)
      toast({
        title: "保存成功",
        description: "个人信息已更新",
        variant: "success",
      })
    }
    setIsEditing(!isEditing)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditedInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="flex-1 bg-white">
      <TopNav breadcrumbs={["首页", "个人中心", "个人信息"]} paths={["/dashboard", "/profile", "/profile/info"]} />

      <div className="flex border-b">
        <Link href="/dashboard" className="py-3 px-4 text-gray-500 hover:text-gray-700">
          首页
        </Link>
        <div className="py-3 px-4 text-blue-500 border-b-2 border-blue-500 font-medium flex items-center">
          个人信息
          <X className="ml-1 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">个人信息</h2>
            <Button
              onClick={handleEditToggle}
              className={isEditing ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
            >
              {isEditing ? (
                <>
                  <Check className="h-4 w-4 mr-1" /> 保存
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-1" /> 编辑
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={userInfo.avatar || "/placeholder.svg?height=128&width=128&query=user"}
                  alt="用户头像"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
                {isEditing && <AvatarUpload />}
              </div>
              <h3 className="mt-4 text-lg font-medium">{userInfo.name}</h3>
              <p className="text-gray-500">{userInfo.position}</p>
              <p className="text-gray-500">{userInfo.department}</p>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4 pb-2 border-b">基本信息</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">姓名</div>
                  {isEditing ? (
                    <Input
                      value={editedInfo.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="h-9"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">{userInfo.name}</div>
                  )}
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">性别</div>
                  {isEditing ? (
                    <Select value={editedInfo.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="请选择性别" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="男">男</SelectItem>
                        <SelectItem value="女">女</SelectItem>
                        <SelectItem value="其他">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">{userInfo.gender}</div>
                  )}
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">手机号码</div>
                  {isEditing ? (
                    <Input
                      value={editedInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="h-9"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">{userInfo.phone}</div>
                  )}
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">电子邮箱</div>
                  {isEditing ? (
                    <Input
                      value={editedInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="h-9"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">{userInfo.email}</div>
                  )}
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">部门</div>
                  {isEditing ? (
                    <Input
                      value={editedInfo.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className="h-9"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">{userInfo.department}</div>
                  )}
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">职位</div>
                  {isEditing ? (
                    <Input
                      value={editedInfo.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      className="h-9"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">{userInfo.position}</div>
                  )}
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">员工编号</div>
                  {isEditing ? (
                    <Input
                      value={editedInfo.employeeId}
                      onChange={(e) => handleInputChange("employeeId", e.target.value)}
                      className="h-9"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">{userInfo.employeeId}</div>
                  )}
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">入职日期</div>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={editedInfo.joinDate}
                      onChange={(e) => handleInputChange("joinDate", e.target.value)}
                      className="h-9"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">{userInfo.joinDate}</div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <div className="text-sm text-gray-500 mb-1">联系地址</div>
                  {isEditing ? (
                    <Input
                      value={editedInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="h-9"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">{userInfo.address}</div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <div className="text-sm text-gray-500 mb-1">个人简介</div>
                  {isEditing ? (
                    <Textarea
                      value={editedInfo.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="min-h-[100px]"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded min-h-[100px]">{userInfo.bio}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4 pb-2 border-b">账号安全</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">登录密码</div>
                  <div className="text-sm text-gray-500">定期修改密码可以保护账号安全</div>
                </div>
                <Button variant="outline">修改</Button>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">绑定手机</div>
                  <div className="text-sm text-gray-500">已绑定：{userInfo.phone}</div>
                </div>
                <Button variant="outline">修改</Button>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">绑定邮箱</div>
                  <div className="text-sm text-gray-500">已绑定：{userInfo.email}</div>
                </div>
                <Button variant="outline">修改</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
